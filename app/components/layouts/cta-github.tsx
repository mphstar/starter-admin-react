import React from 'react';
import { Button } from '~/components/ui/button';
import { TbBrandGithub } from "react-icons/tb";

export default function CtaGithub() {
  return (
    <Button variant='ghost' asChild size='sm' className='hidden sm:flex'>
      <a
        href='https://github.com/Kiranism/next-shadcn-dashboard-starter'
        rel='noopener noreferrer'
        target='_blank'
        className='dark:text-foreground'
      >
        <TbBrandGithub />
      </a>
    </Button>
  );
}
