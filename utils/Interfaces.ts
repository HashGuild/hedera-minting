import { SVGProps } from 'react';

export interface Step {
    index:number;
    name:String;
}


export interface Flow extends Step {
    href:string;
    icon:(props: SVGProps<SVGSVGElement>) => JSX.Element;
}

