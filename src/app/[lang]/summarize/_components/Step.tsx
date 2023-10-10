'use client'

import { useEffect, useState } from 'react'

import { Card, CardBody } from '@nextui-org/card'
import { CircularProgress } from '@nextui-org/progress'
import { useTranslations } from 'next-intl'
import { useAtom } from 'jotai'

import { cn } from '@/utils/classnames'
import { currentPromiseAtom } from '@/atoms/summarize'

import type { StepsGeneratorType } from '../controllers'

type Props = {
	label: string
	description: string
	number: 1 | 2 | 3
	promise: StepsGeneratorType
}

type SkeletonProps = {
	children: React.ReactNode
	className: string
}

const Skeleton: React.FC<SkeletonProps> = ({ children, className }) => (
	<Card>
		<CardBody className={cn('bg-background dark:bg-default-100/50', 'grid place-items-center gap-y-4', className)}>
			{children}
		</CardBody>
	</Card>
)

const Status: React.FC<Props> = ({ promise, label, description, number }) => {
	const [isPending, setIsPending] = useState<boolean>(true)
	const [currentPromise, setCurrentPromise] = useAtom(currentPromiseAtom)
	const t = useTranslations('summarize.steps')

	useEffect(() => {
		promise.then(({ value }) => {
			console.log(value)
			setIsPending(false)
			setCurrentPromise(number)
		})
	}, [])

	return (
		<Skeleton
			className={cn(
				'h-56 rounded-2xl border',
				isPending
					? [
							'border-blue-300',
							'before:absolute before:inset-0',
							'before:bg-gradient-to-r before:from-transparent before:via-blue-600/10 before:to-transparent',
							'before:-translate-x-full before:animate-[shimmer_2s_infinite]',
					  ]
					: 'border-green-400',
			)}
		>
			<div className="text-center">
				<div className={cn('text-xl font-bold', isPending ? 'text-blue-600/80' : 'text-green-600/80')}>
					{label} - {currentPromise}
				</div>
				<div className="text-small">{description}</div>
			</div>
			<div className="grid gap-3 place-items-center">
				{isPending ? (
					<>
						<CircularProgress
							classNames={{
								svg: 'w-12 h-12 drop-shadow-md',
								indicator: 'stroke-blue-400 stroke-[4px]',
								track: 'stroke-blue-200/40  stroke-[3px]',
								value: 'text-3xl font-semibold text-white',
							}}
							aria-label="loading"
						/>
						<span>{t('loading')}</span>
					</>
				) : (
					<>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-12 h-12 stroke-green-500 drop-shadow-md"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>

						<span>{t('success')}</span>
					</>
				)}
			</div>
		</Skeleton>
	)
}

export default Status