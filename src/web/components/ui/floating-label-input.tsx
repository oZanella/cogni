import * as React from 'react';

import { cn } from '@/web/lib/utils';

type FloatingLabelInputProps = React.ComponentProps<'input'> & {
  label: string;
};

function FloatingLabelInput({ label, id, className, ...props }: FloatingLabelInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className="relative">
      <input
        data-slot="input"
        className={cn(
          'peer h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 pt-1 text-base outline-none transition-colors duration-200 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-transparent focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          className
        )}
        {...props}
        id={inputId}
        placeholder=" "
      />
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute top-1/2 left-2.5 origin-left -translate-y-1/2 scale-100 bg-card px-1 text-base text-muted-foreground transition-all duration-200 ease-out peer-focus-visible:top-0 peer-focus-visible:scale-90 peer-focus-visible:text-primary peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:scale-90 peer-aria-invalid:text-destructive md:text-sm"
      >
        {label}
      </label>
    </div>
  );
}

export { FloatingLabelInput };
