import { Review } from '@/lib/review/models/review'
import sql from '../db'

/* https://www.educative.io/answers/the-levenshtein-distance-algorithm
 * uses the Levenshtein distance algorithm to compare the distance between two strings */
export function editDistance(string1: string, string2: string): number {
	string1 = string1.toLowerCase()
	string2 = string2.toLowerCase()
	const costs: number[] = []
	for (let i = 0; i <= string1.length; i++) {
		let lastValue: number = i
		for (let j = 0; j <= string2.length; j++) {
			if (i == 0) {
				costs[j] = j
			} else {
				if (j > 0) {
					let newValue: number = costs[j - 1]
					if (string1.charAt(i - 1) != string2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
					costs[j - 1] = lastValue
					lastValue = newValue
				}
			}
		}
		if (i > 0) {
			costs[string2.length] = lastValue
		}
	}
	return costs[string2.length]
}

// https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
export function reviewSimilarity(review1: string, review2: string): number {
	let longer: string = review1
	let shorter: string = review2
	if (review1.length < review2.length) {
		longer = review2
		shorter = review1
	}
	const longerLength: number = longer.length
	if (longerLength == 0) {
		return 1.0
	}
	return (
		(longerLength - editDistance(longer, shorter)) /
		parseFloat(longerLength.toString())
	)
}

// Loop through all the reviews retrieved from the db for this landlord and check if they are similar to the input text
export async function checkReviewsForSimilarity(
	reviewsFromDbForThatUser: Review[],
	reviewUserSubmitted: string,
): Promise<boolean> {
	for (const review of reviewsFromDbForThatUser) {
		const similarityScore: number = reviewSimilarity(
			review.review,
			reviewUserSubmitted,
		)
		if (similarityScore > 0.7) {
			return true
		}
	}
	return false
}

export async function checkForLandlordSpam(landlord: string): Promise<boolean> {
	const recentReviews = await sql`
		SELECT landlord
		FROM recent_review
		ORDER BY created_at DESC
		LIMIT 25;
	`

	const occurances = recentReviews.filter(
		(review) =>
			review.landlord.toLocaleUpperCase() === landlord.toLocaleLowerCase(),
	).length

	if (occurances >= 5) {
		return true
	}

	const recentEntries = recentReviews.slice(0, 2)

	if (
		recentEntries.length === 2 &&
		recentEntries.every(
			(review) =>
				review.landlord.toLocaleUpperCase() === landlord.toLocaleUpperCase(),
		)
	) {
		return true
	}

	return false
}

export async function updateRecentReviews(landlord: string) {
	await sql`INSERT INTO recent_review (landlord) VALUES (${landlord});`

	await sql`DELETE FROM recent_review WHERE created_at < (SELECT MIN(created_at) FROM (SELECT created_at FROM recent_review ORDER BY created_at DESC LIMIT 25) AS subquery)`
}
