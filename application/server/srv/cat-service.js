import cds from "@sap/cds"

export class CatalogService extends cds.ApplicationService {
	async init() {
		this.on("getAvgRating", async () => {
				const { avg } = await SELECT.one`avg(rating) as avg`.from("Ratings")
				return Number(avg).toFixed(2)
		})

		this.on("createRating", async ({ data: { rating } }) => {
			const result = await INSERT({ rating }).into("Ratings")
			const entries = [...result]
			return await SELECT.one.from("Ratings").where({
				ID: entries[0].ID
			})
		})

		await super.init();
	}
}
