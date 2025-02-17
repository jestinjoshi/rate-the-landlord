/**
 * @jest-environment jsdom
 */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import SpamReviewModal from '@/components/create-review/SpamReviewModal'

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn().mockReturnValue({
		t: jest.fn((key) => {
			if (key === 'create-review.spam-modal.localStorageDetection.title') {
				return 'It appears you have reviewed this Landlord before...'
			}
			if (
				key === 'create-review.spam-modal.localStorageDetection.description'
			) {
				return "We understand you want to voice your frustration about your previous Landlord in a safe and public way. However, leaving multiple reviews about the same landlord causes both the reviews for that Landlord, and the site, to lose their integrity. Please only leave 1 review per landlord you've had so that this site can remain a fair representation for both the Tenants and Landlords."
			}
			if (key === 'create-review.spam-modal.DBDetection.title') {
				return 'We have noticed potential spam reviews related to this landlord.'
			}
			if (key === 'create-review.spam-modal.DBDetection.description') {
				return 'To protect the integrity of our reviews please try again later. If you have any questions, please reach out to us at contact@ratethelandlord.org'
			}
			if (key === 'create-review.modal.close') {
				return 'Close'
			}
			return ''
		}),
	}),
}))

describe('Spam Review Modal component', () => {
	test('should render the modal when isOpen is true and detectionMethod is localStorageDetection', () => {
		const setIsOpenMock = jest.fn()

		render(
			<SpamReviewModal
				isOpen={true}
				setIsOpen={setIsOpenMock}
				detectionMethod='localStorageDetection'
			/>,
		)

		// Verify that the modal is rendered
		const modalElement = screen.getByRole('dialog')
		expect(modalElement).toBeInTheDocument()

		// Verify that the modal title and description are displayed correctly
		expect(
			screen.getByText('It appears you have reviewed this Landlord before...'),
		).toBeInTheDocument()
		expect(
			screen.getByText(
				"We understand you want to voice your frustration about your previous Landlord in a safe and public way. However, leaving multiple reviews about the same landlord causes both the reviews for that Landlord, and the site, to lose their integrity. Please only leave 1 review per landlord you've had so that this site can remain a fair representation for both the Tenants and Landlords.",
			),
		).toBeInTheDocument()

		// Verify that the close button is rendered
		const closeButton = screen.getByText('Close')
		expect(closeButton).toBeInTheDocument()

		// Simulate clicking the close button
		fireEvent.click(closeButton)

		// Verify that the setIsOpen function is called with false when the close button is clicked
		expect(setIsOpenMock).toHaveBeenCalledWith(false)
	})

	test('should render the modal when isOpen is true and detectionMethod is DBDetection', () => {
		const setIsOpenMock = jest.fn()

		render(
			<SpamReviewModal
				isOpen={true}
				setIsOpen={setIsOpenMock}
				detectionMethod='DBDetection'
			/>,
		)

		// Verify that the modal is rendered
		const modalElement = screen.getByRole('dialog')
		expect(modalElement).toBeInTheDocument()

		// Verify that the modal title and description are displayed correctly
		expect(
			screen.getByText(
				'We have noticed potential spam reviews related to this landlord.',
			),
		).toBeInTheDocument()
		expect(
			screen.getByText(
				'To protect the integrity of our reviews please try again later. If you have any questions, please reach out to us at contact@ratethelandlord.org',
			),
		).toBeInTheDocument()

		// Verify that the close button is rendered
		const closeButton = screen.getByText('Close')
		expect(closeButton).toBeInTheDocument()

		// Simulate clicking the close button
		fireEvent.click(closeButton)

		// Verify that the setIsOpen function is called with false when the close button is clicked
		expect(setIsOpenMock).toHaveBeenCalledWith(false)
	})

	test('should not render the modal when isOpen is false', () => {
		const setIsOpenMock = jest.fn()

		render(
			<SpamReviewModal
				isOpen={false}
				setIsOpen={setIsOpenMock}
				detectionMethod='localStorageDetection'
			/>,
		)

		// Verify that the modal is not rendered
		const modalElement = screen.queryByRole('dialog')
		expect(modalElement).toBeNull()

		// Verify that the setIsOpen function is not called when the component is not rendered
		expect(setIsOpenMock).not.toHaveBeenCalled()
	})

	// Add more tests as needed for other functionality in the component
})
