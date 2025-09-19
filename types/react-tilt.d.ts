// types/react-tilt.d.ts
/**
 * @file react-tilt.d.ts
 * @description Archivo de declaración de tipos para react-tilt.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
declare module "react-tilt" {
  import { Component, HTMLProps } from "react";

  interface TiltProps extends HTMLProps<HTMLDivElement> {
    options?: {
      max?: number;
      scale?: number;
      speed?: number;
      glare?: boolean;
      "max-glare"?: number;
      perspective?: number;
      easing?: string;
      reset?: boolean;
    };
  }

  export class Tilt extends Component<TiltProps> {}
}
