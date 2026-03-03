import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { LoginDto } from '../auth/dto/login.dto'
import { RegisterDto } from '../auth/dto/register.dto'

// Demo user for mock authentication
const DEMO_USER = {
  id: 'demo-user-001',
  email: 'demo@tiaohai.com',
  name: 'Demo Traveler',
  role: 'guest',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
}

const MOCK_TOKEN = 'mock_jwt_token_' + Date.now()

@Controller('mock/auth')
export class MockAuthController {

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    // Demo login - any credentials work
    return {
      token: MOCK_TOKEN,
      user: DEMO_USER,
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() registerDto: RegisterDto) {
    return {
      token: MOCK_TOKEN,
      user: {
        ...DEMO_USER,
        email: registerDto.email,
        name: registerDto.email.split('@')[0],
      },
    }
  }

  @Get('me')
  getMe() {
    return DEMO_USER
  }
}
