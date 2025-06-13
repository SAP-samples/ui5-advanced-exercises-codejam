module.exports = function CatalogService() {
	this.on("getAvgRating", async () => {
		const ratings = await SELECT("rating").from("Ratings")
		const avg = ratings.map(r => r.rating).reduce((a,b) => a + b)/ratings.length
		return avg.toFixed(2)
	})

	this.on("createRating", async ({ data: { rating } }) => {
		const result = await INSERT({ rating }).into("Ratings")
		const entries = [...result]
		return await SELECT.one.from("Ratings").where({ ID: entries[0].ID })
	})
}
