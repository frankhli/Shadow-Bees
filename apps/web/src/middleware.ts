import createMiddleware from 'next-intl/middleware';
import {routing} from './navigation';

export default createMiddleware(routing);

export const config = {
  // 排除 API、静态资源、B端后台路径
  matcher: ['/((?!api|_next|static|admin|hotel|guide|venue|.*\\..*).*)']
};
