import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@Modules/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@Modules/user';
import { EnvironmentService } from '@Package/config';
import { AuthError } from '@Modules/auth/services/auth.error';
import { RedisService } from '@Package/cache/redis/redis.service';
import { MailService } from '@Package/services';
import { Connection } from 'mongoose';
import { SingInDto } from '@Modules/auth/api/dto/request/singIn.dto';
import { LogInDto } from '@Modules/auth/api/dto/request/logIn.dto';
import { AppError } from '@Package/error/app.error';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;
  let redisService: RedisService;
  let mailService: MailService;
  let connection: Connection;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'user',
    isActive: true
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockToken'),
            verify: jest.fn().mockReturnValue({ email: 'test@example.com', type: 'password_reset' })
          }
        },
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn(),
            createUser: jest.fn().mockResolvedValue(mockUser),
            updateUserByEmail: jest.fn().mockResolvedValue(mockUser)
          }
        },
        {
          provide: EnvironmentService,
          useValue: {
            get: jest.fn().mockReturnValue('mockSecret')
          }
        },
        {
          provide: AuthError,
          useValue: {
            userAlreadyExist: jest.fn().mockImplementation(() => { throw new AppError({ code: 400, message: 'User already exists' }); }),
            invalidCredentials: jest.fn().mockImplementation(() => { throw new AppError({ code: 401, message: 'Invalid credentials' }); }),
            otpExpiredOrNotFound: jest.fn().mockImplementation(() => { throw new AppError({ code: 400, message: 'OTP expired or not found' }); }),
            invalidOtp: jest.fn().mockImplementation(() => { throw new AppError({ code: 400, message: 'Invalid OTP' }); }),
            otpVerificationFailed: jest.fn().mockImplementation(() => { throw new AppError({ code: 500, message: 'OTP verification failed' }); }),
            invalidResetToken: jest.fn().mockImplementation(() => { throw new AppError({ code: 400, message: 'Invalid reset token' }); })
          }
        },
        {
          provide: RedisService,
          useValue: {
            set: jest.fn().mockResolvedValue('OK'),
            get: jest.fn(),
            delete: jest.fn().mockResolvedValue(1)
          }
        },
        {
          provide: MailService,
          useValue: {
            sendSingInOTP: jest.fn().mockResolvedValue(true),
            sendPasswordResetEmail: jest.fn().mockResolvedValue(true)
          }
        },
        {
          provide: Connection,
          useValue: {
            startSession: jest.fn().mockReturnValue({
              withTransaction: jest.fn().mockImplementation(async (callback) => {
                await callback({});
              })
            })
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
    redisService = module.get<RedisService>(RedisService);
    mailService = module.get<MailService>(MailService);
    connection = module.get<Connection>(Connection);
  });

  describe('signIn', () => {
    it('should create a new user and send OTP', async () => {
      const signInDto: SingInDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      (userService.findUserByEmail as jest.Mock).mockResolvedValue(null);

      const result = await service.signIn(signInDto);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('message', 'OTP has been sent to your email');
      expect(userService.createUser).toHaveBeenCalled();
      expect(redisService.set).toHaveBeenCalled();
      expect(mailService.sendSingInOTP).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      const signInDto: SingInDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      (userService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);

      await expect(service.signIn(signInDto)).rejects.toThrow('User already exists');
    });
  });

  describe('logIn', () => {
    it('should return access token for valid credentials', async () => {
      const logInDto: LogInDto = {
        email: 'test@example.com',
        password: 'password123'
      };

      (userService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (redisService.set as jest.Mock).mockResolvedValue('OK');

      const result = await service.logIn(logInDto);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('message', 'OTP has been sent to your email');
    });

    it('should throw error for invalid credentials', async () => {
      const logInDto: LogInDto = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      (userService.findUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(service.logIn(logInDto)).rejects.toThrow('Invalid credentials');
    });
  });

  describe('verifyOtp', () => {
    it('should verify OTP and activate user', async () => {
      (redisService.get as jest.Mock).mockResolvedValue('123456');

      const result = await service.verifyOtp('test@example.com', '123456');

      expect(result).toHaveProperty('message', 'OTP verified successfully');
      expect(redisService.delete).toHaveBeenCalled();
      expect(userService.updateUserByEmail).toHaveBeenCalled();
    });

    it('should throw error for invalid OTP', async () => {
      (redisService.get as jest.Mock).mockResolvedValue('123456');

      await expect(service.verifyOtp('test@example.com', '654321')).rejects.toThrow('Invalid OTP');
    });

    it('should throw error for expired OTP', async () => {
      (redisService.get as jest.Mock).mockResolvedValue(null);

      await expect(service.verifyOtp('test@example.com', '123456')).rejects.toThrow('OTP expired or not found');
    });
  });

  describe('requestPasswordReset', () => {
    it('should send password reset email', async () => {
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.requestPasswordReset('test@example.com');

      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('token');
      expect(redisService.set).toHaveBeenCalled();
      expect(mailService.sendPasswordResetEmail).toHaveBeenCalled();
    });

    it('should return success message even if user not found', async () => {
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(null);

      const result = await service.requestPasswordReset('nonexistent@example.com');

      expect(result).toHaveProperty('message');
      expect(result.token).toBe('');
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const result = await service.resetPassword('test@example.com', 'newPassword123');

      expect(result).toHaveProperty('message', 'Password has been reset successfully');
      expect(userService.updateUserByEmail).toHaveBeenCalled();
    });

    it('should handle errors during password reset', async () => {
      (userService.updateUserByEmail as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(service.resetPassword('test@example.com', 'newPassword123')).rejects.toThrow('OTP verification failed');
    });
  });
}); 