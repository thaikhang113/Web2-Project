const toUser = (data) => {
	if (!data) return null;

	return {
		id: data.id,
		username: data.username,
		email: data.email,
		passwordHash: data.password_hash,
		role: data.role,
		avatar: data.avatar,
		bio: data.bio,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};
};

const toGame = (data) => {
	if (!data) return null;

	return {
		id: data.id,
		name: data.name,
		slug: data.slug,
		description: data.description,
		boardSize: data.board_size,
		isEnabled: data.is_enabled,
		accent: data.accent,
		config: data.config ?? {},
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};
};

const toGameState = (data) => {
	if (!data) return null;

	return {
		id: data.id,
		userId: data.user_id,
		gameId: data.game_id,
		board: data.board ?? [],
		timeLeft: data.time_left,
		currentTurn: data.current_turn,
		metadata: data.metadata ?? {},
		savedAt: data.saved_at,
	};
};

const toScore = (data) => {
	if (!data) return null;

	return {
		id: data.id,
		userId: data.user_id,
		gameId: data.game_id,
		score: data.score,
		duration: data.duration,
		playedAt: data.played_at,
	};
};

const toFriendship = (data) => {
	if (!data) return null;

	return {
		id: data.id,
		requesterId: data.requester_id,
		receiverId: data.receiver_id,
		status: data.status,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};
};

const toMessage = (data) => {
	if (!data) return null;

	return {
		id: data.id,
		senderId: data.sender_id,
		receiverId: data.receiver_id,
		content: data.content,
		createdAt: data.created_at,
	};
};

const toReview = (data) => {
	if (!data) return null;

	return {
		id: data.id,
		userId: data.user_id,
		gameId: data.game_id,
		rating: data.rating,
		comment: data.comment,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};
};

const toAchievement = (data) => {
	if (!data) return null;

	return {
		id: data.id,
		name: data.name,
		description: data.description,
		icon: data.icon,
		conditionType: data.condition_type,
		conditionValue: data.condition_value,
		createdAt: data.created_at,
	};
};

module.exports = {
	toAchievement,
	toFriendship,
	toGame,
	toGameState,
	toMessage,
	toReview,
	toScore,
	toUser,
};
