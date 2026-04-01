function mapUser(row) {
	if (!row) {
		return null;
	}

	return {
		id: row.id,
		username: row.username,
		email: row.email,
		passwordHash: row.password_hash,
		role: row.role,
		avatar: row.avatar,
		bio: row.bio,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

function mapGame(row) {
	if (!row) {
		return null;
	} else
		return {
			id: row.id,
			name: row.name,
			slug: row.slug,
			description: row.description,
			boardSize: row.board_size,
			isEnabled: row.is_enabled,
			accent: row.accent,
			config: row.config || {},
			createdAt: row.created_at,
			updatedAt: row.updated_at,
		};
}

function mapGameState(row) {
	if (!row) {
		return null;
	} else
		return {
			id: row.id,
			userId: row.user_id,
			gameId: row.game_id,
			board: row.board || [],
			timeLeft: row.time_left,
			currentTurn: row.current_turn,
			metadata: row.metadata || {},
			savedAt: row.saved_at,
		};
}

function mapScore(row) {
	if (!row) {
		return null;
	}

	return {
		id: row.id,
		userId: row.user_id,
		gameId: row.game_id,
		score: row.score,
		duration: row.duration,
		playedAt: row.played_at,
	};
}

function mapFriendship(row) {
	if (!row) {
		return null;
	}
	return {
		id: row.id,
		requesterId: row.requester_id,
		receiverId: row.receiver_id,
		status: row.status,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

function mapMessage(row) {
	if (!row) {
		return null;
	}
	return {
		id: row.id,
		senderId: row.sender_id,
		receiverId: row.receiver_id,
		content: row.content,
		createdAt: row.created_at,
	};
}

function mapReview(row) {
	if (!row) {
		return null;
	}

	return {
		id: row.id,
		userId: row.user_id,
		gameId: row.game_id,
		rating: row.rating,
		comment: row.comment,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

function mapAchievement(row) {
	if (!row) {
		return null;
	}

	return {
		id: row.id,
		name: row.name,
		description: row.description,
		icon: row.icon,
		conditionType: row.condition_type,
		conditionValue: row.condition_value,
		createdAt: row.created_at,
	};
}

module.exports = {
	mapAchievement,
	mapFriendship,
	mapGame,
	mapGameState,
	mapMessage,
	mapReview,
	mapScore,
	mapUser,
};
