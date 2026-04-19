/**
 * ARQUIVO DE REFERÊNCIA - BACKEND NEST.JS MODEL (Single File Representation)
 * -------------------------------------------------------------------------
 * Este arquivo representa a arquitetura e controladores do Nest.js 
 * necessários para rodar um serviço de autenticação completo que lidaria com 
 * o que o Supabase está fazendo na aplicação front-end.
 * 
 * Estrutura proposta para um repositório Backend Separado usando comando:
 * $ npx @nestjs/cli new backend-app
 */

import { Module, Controller, Post, Body, Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService, JwtModule } from '@nestjs/jwt'; // (Módulos do ecossistema NestJS caso em ambiente rodando npm install)

/* --- 1. DTOs (Data Transfer Objects para Tipagem Forte Nest) --- */
export class AuthDto {
  email!: string;
  password!: string;
}

/* --- 2. SERVICE LAYER (Logica de Negocio e Persistencia) --- */
@Injectable()
export class AuthService {
  // constructor(private jwtService: JwtService, private prismaService: PrismaService) {}

  async signup(dto: AuthDto) {
    // 1. Verificar se o E-mail ja existe no Banco de Dados
    // const userExists = await this.prismaService.user.findUnique({ where: { email: dto.email }});
    // if(userExists) throw new UnauthorizedException("Email já cadastrado");

    // 2. Hash da Senha (usando bcrypt)
    // const hash = await argon.hash(dto.password);

    // 3. Salvar no Database
    // const user = await this.prismaService.user.create({ data: { email: dto.email, hash } });

    // 4. Retornar Token de Acesso (mesmo padrão Supabase que vai para o LocalStorage)
    return this.signToken(999, dto.email);
  }

  async signin(dto: AuthDto) {
    // 1. Procurar o usuário
    // const user = await this.prismaService.user.findUnique({ where: { email: dto.email }});
    // if(!user) throw new UnauthorizedException("Credenciais inválidas");

    // 2. Comparar Senha Correta
    // const isPasswordMatch = await argon.verify(user.hash, dto.password);
    // if(!isPasswordMatch) throw new UnauthorizedException("Credenciais inválidas");

    // 3. Devolver Token para Front-end armazenar
    return this.signToken(999, user.email);
  }

  // Gera o Payload (Auth Session localstorage) JWT (Semelhante ao getSession() Supabase)
  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    
    // const token = await this.jwtService.signAsync(payload, { expiresIn: '15m', secret: process.env.JWT_SECRET });
    const token = "mock-jwt-token-abcd-1234";

    return { access_token: token };
  }
}

/* --- 3. CONTROLLER LAYER (Rotas da API de Autênticacao) --- */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/signup
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  // POST /auth/signin
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}

/* --- 4. APP MODULE (Raiz da injeção de dependência do NestJS) --- */
@Module({
  // imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}

/**
 * USO E CONCLUSÕES:
 * Ao rodar este backend (npm run start:dev), o cliente React apenas mudaria
 * as requisições que estão lá no Login.tsx de "supabase.auth..." para:
 * 
 * const response = await fetch("http://localhost:3000/auth/signin", {
 *   method: "POST",
 *   body: JSON.stringify({ email, password })
 * })
 * const authSession = await response.json()
 * localStorage.setItem("access_token", authSession.access_token)
 */
