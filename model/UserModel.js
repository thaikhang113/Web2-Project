const { db } = require("../config/db");
const { mapUser } = require("../utils/mappers");

const UserModel = {
	async findByEmail(email) {
		const row = await db("users")
			.whereRaw("lower(email) = lower(?)", [String(email)])
			.first();
		return mapUser(row);
	},

	async findByUsername(username) {
		const row = await db("users")
			.whereRaw("lower(username) = lower(?)", [String(username)])
			.first();
		return mapUser(row);
	},

	async findById(id) {
		const row = await db("users")
			.where({ id: Number(id) })
			.first();
		return mapUser(row);
	},

	async create(data) {
		const [row] = await db("users")
			.insert({
				username: data.username,
				email: data.email,
				password_hash: data.passwordHash,
				role: data.role || "client",
				avatar:
					data.avatar ||
					`https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(data.username)}`,
				bio: data.bio || "",
			})
			.returning("*");

		return mapUser(row);
	},

	async updateProfile(id, changes) {
		const [row] = await db("users")
			.where({ id: Number(id) })
			.update(
				{
					username: changes.username,
					bio: changes.bio,
					avatar: changes.avatar,
					updated_at: db.fn.now(),
				},
				"*",
			);

		return mapUser(row);
	},

	async searchUsers(query, excludeUserId) {
		let builder = db("users").whereNot({ id: Number(excludeUserId) });
		const keyword = String(query || "").trim();

		if (keyword) {
			builder = builder.andWhere((subquery) => {
				subquery
					.whereILike("username", `%${keyword}%`)
					.orWhereILike("email", `%${keyword}%`);
			});
		}

		const rows = await builder.orderBy("username", "asc").limit(20);
		return rows.map(mapUser);
	},

	async listAll() {
		const rows = await db("users").select("*").orderBy("created_at", "asc");
		return rows.map(mapUser);
	},
};

module.exports = { UserModel };
