import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    
    return (
        <section className='flex flex-col'>
            <div  className='m-2 self-end'>
            <Button variant={"destructive"}>LOGOUT</Button>
            </div>
            {children}

        </section>
    );
}
