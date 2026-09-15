import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { MinusSignIcon } from "@hugeicons/core-free-icons"

function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      spellCheck={false}
      containerClassName={cn(
        "flex w-full items-center justify-center gap-1.5 sm:gap-2",
        "has-disabled:opacity-50",
        containerClassName
      )}
      className={cn(
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function InputOTPGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center justify-center",
        "rounded-md overflow-hidden",
        "border border-slate-300",
        "bg-slate-100",
        "shadow-sm",
        "has-aria-invalid:border-red-500",
        "has-aria-invalid:ring-4",
        "has-aria-invalid:ring-red-500/10",
        className
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React.useContext(OTPInputContext)

  const {
    char,
    hasFakeCaret,
    isActive,
  } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Responsive size
        "relative flex",
        "h-11 w-10",
        "sm:h-12 sm:w-12",

        // Center content
        "items-center justify-center",

        // Text
        "text-base sm:text-lg font-semibold",

        // Background
        "bg-white",

        // Border
        "border-r border-slate-300",
        "last:border-r-0",

        // Text color
        "text-slate-900",

        // Animation
        "transition-all duration-200",

        // Focus / active
        "outline-none",
        "data-[active=true]:z-10",
        "data-[active=true]:bg-white",
        "data-[active=true]:border-slate-500",
        "data-[active=true]:ring-2",
        "data-[active=true]:ring-slate-400/40",

        // Invalid
        "aria-invalid:border-red-500",
        "data-[active=true]:aria-invalid:ring-red-500/20",

        
      )}
      {...props}
    >
      {char}

      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-caret-blink bg-slate-700 duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({
  className,
  ...props
}) {
  return (
    <div
      data-slot="input-otp-separator"
      className={cn(
        "flex items-center justify-center",
        "px-1 sm:px-2",
        "text-slate-500",
        className
      )}
      role="separator"
      {...props}
    >
      <HugeiconsIcon
        icon={MinusSignIcon}
        strokeWidth={2}
        className="size-3 sm:size-4"
      />
    </div>
  )
}

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
}