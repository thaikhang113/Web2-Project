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
	};
}

function mapGame(row) {
	if (!row) {
		return null;
	}

	return {
		id: row.id,
		name: row.name,
		slug: row.slug,
		description: row.description,
		boardSize: row.board_size,
		isEnabled: row.is_enabled,
		accent: row.accent,
		config: row.config || {},
	};
}

function mapGameState(row) {
	if (!row) {
		return null;
	}

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

module.exports = {
	mapGame,
	mapGameState,
	mapScore,
	mapUser,
};
