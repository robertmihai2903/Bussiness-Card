import React from 'react'
import cn from 'classnames';

type Intent = 'primary' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

interface IconButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    intent?: Intent; // can add more
    size?: Size;
}

const colorMap: Record<Intent, string> = {
    primary: 'bg-amber-600 text-white',
    secondary: 'bg-slate-800 text-slate-400',
};

const sizeMap: Record<Size, string> = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
};

export function IconButton({
                                       intent = 'primary',
                                       size = 'md',
                                       className,
                                       ...props
                                   }: IconButtonProps) {
    const colorClass = colorMap[intent];
    const sizeClass = sizeMap[size];
    const classes = cn(
        'box-21',
        colorClass,
        sizeClass,
        className
    );
    return <button className={classes} {...props} />;
}
