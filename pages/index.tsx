import Search from '@/components/home/Search'
import Hero from '@/components/home/hero'
import IconSection from '@/components/home/icon-section'
import Testimonials from '@/components/home/testimonials'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'

export default function Home(): JSX.Element {
	const title = 'Rate The Landlord'
	const desc =
		'Share information with tenants like you and rate your landlord. We are a community platform that elevates tenant voices to promote landlord accountability. Find Landlord Reviews and Resources.'
	const siteURL = 'https://ratethelandlord.org'
	const pathName = useRouter().pathname
	const pageURL = pathName === '/' ? siteURL : siteURL + pathName
	const twitterHandle = '@r8thelandlord'
	const siteName = 'RateTheLandlord.org'

	return (
		<div>
			<NextSeo
				title={title}
				description={desc}
				canonical={pageURL}
				openGraph={{
					type: 'website',
					locale: 'en_CA', //  Default is en_US
					url: pageURL,
					title,
					description: desc,

					site_name: siteName,
				}}
				twitter={{
					handle: twitterHandle,
					site: twitterHandle,
					cardType: 'summary_large_image',
				}}
				additionalMetaTags={[
					{
						property: 'author',
						content: title,
					},
				]}
				additionalLinkTags={[
					{
						rel: 'icon',
						href: `${siteURL}/favicon.ico`,
					},
				]}
			/>
			<div className='mx-2 mt-4 rounded-3xl bg-gray-100 pb-4'>
				<Hero />
				<Search />
			</div>
			<IconSection />
			<Testimonials />
		</div>
	)
}
