import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                // Financial dashboard specific colors
                finance: {
                    navy: '#1A1F2C',
                    teal: '#33C3F0',
                    success: '#4CAF50',
                    warning: '#F97316',
                    danger: '#EA384C',
                    neutral: '#8E9196',
                    light: '#F6F6F7',
                    chart: {
                        green: '#22C55E',
                        red: '#EF4444',
                        blue: '#3B82F6',
                        purple: '#8B5CF6',
                        orange: '#F97316',
                        yellow: '#EAB308'
                    }
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                // Financial dashboard animations
                'pulse-gentle': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.85' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'slide-right': {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-500px 0' },
                    '100%': { backgroundPosition: '500px 0' }
                },
                'number-increment': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                // Financial dashboard animations
                'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'slide-up': 'slide-up 0.5s ease-out',
                'slide-right': 'slide-right 0.5s ease-out',
                'scale-in': 'scale-in 0.4s ease-out',
                'fade-in': 'fade-in 0.4s ease-out',
                'shimmer': 'shimmer 1.5s infinite linear',
                'number-increment': 'number-increment 0.5s ease-out'
			},
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'glass-gradient': 'linear-gradient(108deg, rgba(242,245,139,0.05) 17.7%, rgba(148,197,20,0.05) 91.2%)',
                'hero-gradient': 'linear-gradient(102.3deg, rgba(77,79,143,1) 5.9%, rgba(144,72,132,1) 64%, rgba(156,19,99,1) 89%)',
                'card-gradient': 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)',
                'chart-gradient': 'linear-gradient(180deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 100%)',
                'success-gradient': 'linear-gradient(180deg, rgba(76,175,80,0.2) 0%, rgba(76,175,80,0) 100%)',
                'danger-gradient': 'linear-gradient(180deg, rgba(234,56,76,0.2) 0%, rgba(234,56,76,0) 100%)'
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'card': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'dropdown': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
