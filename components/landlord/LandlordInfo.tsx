import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { toTitleCase } from '@/util/helpers/toTitleCase'
import { ILandlordReviews } from '@/lib/review/review'
import CatAverages from '../city/CatAverages'

interface IProps {
	name: string
	data: ILandlordReviews
}

const LandlordInfo = ({ name, data }: IProps) => {
	const { t } = useTranslation('landlord')
	const tenantList: Array<string> = t('landlord.tenant-list', {
		returnObjects: true,
	})

	const landlord = decodeURIComponent(name)
	return (
		<div className='w-full border-b border-b-gray-200'>
			<div className='rounded-xl bg-gray-50 p-4'>
				<div className='py-8 text-center sm:py-12'>
					<h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
						{`${toTitleCase(landlord)}`}
					</h2>
					<p className='mt-2 text-gray-700'>{`Read ${
						data.total
					} reviews and rental experiences for ${toTitleCase(landlord)}`}</p>
				</div>

				<CatAverages
					averages={data.catAverages}
					average={data.average}
					total={data.total}
				/>

				<div className='flex flex-col'>
					<h3 className='mt-4 text-lg text-gray-900'>{t('landlord.share')}</h3>
					<p className='mt-1 text-sm text-gray-600'>
						If you've rented from this Landlord, share your experience with
						other tenants.
					</p>

					<Link className='mt-1' href='/create-review'>
						<p className='mt-2 inline-flex cursor-pointer items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm  text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'>
							{t('landlord.submit')}
						</p>
					</Link>
				</div>
			</div>
			<div className='mt-4 divide-gray-900/10 border-t'>
				<Disclosure as='div' className='py-3'>
					{({ open }) => (
						<>
							<dt>
								<Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900'>
									<span className='text-base  leading-7'>
										{t('landlord.tenant')}
									</span>
									<span className='ml-6 flex h-7 items-center'>
										{open ? (
											<MinusSmIcon className='h-6 w-6' aria-hidden='true' />
										) : (
											<PlusSmIcon className='h-6 w-6' aria-hidden='true' />
										)}
									</span>
								</Disclosure.Button>
							</dt>
							<Disclosure.Panel as='dd' className='mt-2 pl-4 pr-12'>
								<ol className='list-decimal'>
									{tenantList.map((item, i) => {
										return (
											<li
												key={i}
												className='list-item text-base leading-7 text-gray-600'
											>
												{item}
											</li>
										)
									})}
								</ol>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	)
}

export default LandlordInfo
