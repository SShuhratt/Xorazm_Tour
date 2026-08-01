import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    const { className, ...rest } = props;
    return (
        <img
            src="/XT_content/xorazmtour_logo.png"
            alt="Xorazm Tour Logo"
            className={className}
            {...rest}
        />
    );
}
