import { Test, TestingModule } from '@nestjs/testing';
import { AuthController, AuthControllerWithToken } from '@Modules/auth/api/controllers/auth.controller';
import { AuthService } from '@Modules/auth/services/auth.service';
import { SingInDto } from '@Modules/auth/api/dto/request/singIn.dto';
import { LogInDto } from '@Modules/auth/api/dto/request/logIn.dto';
import { UserPayload } from 'src/package/auth';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        signIn: jest.fn(),
                        logIn: jest.fn(),
                        requestPasswordReset: jest.fn()
                    }
                }
            ]
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('signIn', () => {
        it('should call authService.signIn with correct parameters', async () => {
            const signInDto: SingInDto = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User'
            };

            await controller.signIn(signInDto);

            expect(authService.signIn).toHaveBeenCalledWith(signInDto);
        });
    });

    describe('logIn', () => {
        it('should call authService.logIn with correct parameters', async () => {
            const logInDto: LogInDto = {
                email: 'test@example.com',
                password: 'password123'
            };

            await controller.logIn(logInDto);

            expect(authService.logIn).toHaveBeenCalledWith(logInDto);
        });
    });

    describe('requestPasswordReset', () => {
        it('should call authService.requestPasswordReset with correct email', async () => {
            const email = 'test@example.com';

            await controller.requestPasswordReset({ email });

            expect(authService.requestPasswordReset).toHaveBeenCalledWith(email);
        });
    });
});

describe('AuthControllerWithToken', () => {
    let controller: AuthControllerWithToken;
    let authService: AuthService;

    const mockUser: UserPayload = {
        id: '1',
        email: 'test@example.com',
        role: 'user'
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthControllerWithToken],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        verifyOtp: jest.fn(),
                        verifyResetOtp: jest.fn(),
                        resetPassword: jest.fn()
                    }
                }
            ]
        }).compile();

        controller = module.get<AuthControllerWithToken>(AuthControllerWithToken);
        authService = module.get<AuthService>(AuthService);
    });

    describe('verifyOtp', () => {
        it('should call authService.verifyOtp with correct parameters', async () => {
            const otp = '123456';

            await controller.verifyOtp(mockUser, { otp });

            expect(authService.verifyOtp).toHaveBeenCalledWith(mockUser.email, otp);
        });
    });

    describe('verifyResetOtp', () => {
        it('should call authService.verifyResetOtp with correct parameters', async () => {
            const otp = '123456';

            await controller.verifyResetOtp(mockUser, { otp });

            expect(authService.verifyResetOtp).toHaveBeenCalledWith(mockUser.email, otp);
        });
    });

    describe('resetPassword', () => {
        it('should call authService.resetPassword with correct parameters', async () => {
            const newPassword = 'newPassword123';

            await controller.resetPassword(mockUser, {
                newPassword,
                otp: ''
            });

            expect(authService.resetPassword).toHaveBeenCalledWith(mockUser.email, newPassword);
        });
    });
}); 