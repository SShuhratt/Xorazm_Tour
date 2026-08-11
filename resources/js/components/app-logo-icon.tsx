import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    const { className, ...rest } = props;
    return (
        <img
            src="/images/logo_transparent.png"
            alt="XORAZM TOUR AND TRAVELS Logo"
            className={className}
            {...rest}
        />
    );
}
