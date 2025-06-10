import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const ProjectAccess = () => {
  return (
    <div className="text-center">
      <Link href="/dashboard">
        <Button
          variant="primary"
          size="lg"
          icon={ArrowRight}
          className="px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          Accéder au projet
        </Button>
      </Link>
    </div>
  );
}; 