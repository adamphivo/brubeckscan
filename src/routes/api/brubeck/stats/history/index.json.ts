import BrubeckStatsDAO from "$lib/dao/brubeckStats";

export async function get({ request, params }) {
    try {
        const brubeckStats = await BrubeckStatsDAO.getAll();

        return {
            status: 200,
            body: {
                data: {
                    brubeckStats
                }
            }
        }
    } catch (e) {
        return {
            status: e.status || 500,
            body: {
                message: e.message
            }
        }
    }
}