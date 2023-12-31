import { cn } from '@/utils/classnames'

type Props = {
	label: string
	className?: string
}

const Title: React.FC<Props> = ({ label, className }) => (
	<h1
		className={cn(
			'py-4 mx-16 text-3xl font-bold text-center text-transparent md:text-4xl lg:text-5xl',
			'bg-gradient-to-t bg-clip-text from-red-600 to-red-300 dark:from-zinc-100/60 dark:to-white',
			className,
		)}
	>
		{label}
	</h1>
)

export default Title
