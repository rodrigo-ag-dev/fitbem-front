interface LogoProps {
  size?: number
  variant?: 'mint' | 'white' | 'ink'
  withWordmark?: boolean
  wordmarkClassName?: string
}

const fills: Record<NonNullable<LogoProps['variant']>, string> = {
  mint: '#2f8f7a',
  white: '#ffffff',
  ink: '#142524',
}

export const Logo = ({ size = 28, variant = 'mint', withWordmark = false, wordmarkClassName }: LogoProps) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.2s-6.4-4.1-9-8C0.5 8.4 1.7 4.7 5.2 3.6 7.3 2.9 9.6 3.9 12 6.4c2.4-2.5 4.7-3.5 6.8-2.8 3.5 1.1 4.7 4.8 2.2 8.6-2.6 3.9-9 8-9 8z"
        fill={fills[variant]}
      />
      <circle cx="17.4" cy="15.6" r="2.6" fill="#c7e86e" />
    </svg>
    {withWordmark && <span className={wordmarkClassName ?? 'logoWordmark'}>Fit Bem</span>}
  </span>
)
