import { useTranslation } from 'react-i18next'
import { country_codes } from '@/util/helpers/getCountryCodes'
import countries from '@/util/countries/countries.json'

interface IProps {
	setValue: (str: string) => void
}

const CountrySelector = ({ setValue }: IProps) => {
	const { t } = useTranslation('create')
	return (
		<div className='sm:col-span-1'>
			<label htmlFor='country' className='block text-sm  text-gray-700'>
				{t('create-review.review-form.country')}
			</label>
			<div className='mt-1'>
				<select
					data-testid='country-selector'
					id='country'
					name='country'
					required
					onChange={(e) => setValue(e.target.value)}
					className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
				>
					{country_codes.map((country) => {
						if (country === 'CA') {
							return (
								<option key={country} value={country}>
									{countries[country]}
								</option>
							)
						} else {
							return (
								<option key={country} value={country}>
									{countries[country]}
								</option>
							)
						}
					})}
				</select>
			</div>
		</div>
	)
}

export default CountrySelector
