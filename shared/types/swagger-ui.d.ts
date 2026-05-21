declare module 'swagger-ui-react' {
  import { FC } from 'react';
  
  interface SwaggerUIProps {
    spec: Record<string, any>;
    url?: string;
    tryItOutEnabled?: boolean;
    supportedSubmitMethods?: string[];
  }
  
  const SwaggerUI: FC<SwaggerUIProps>;
  export default SwaggerUI;
}