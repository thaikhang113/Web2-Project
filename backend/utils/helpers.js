function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

function normalizePage(value, fallback = 1) {
  const page = Number(value || fallback);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : fallback;
}

function normalizeLimit(value, fallback = 10, max = 50) {
  const limit = Number(value || fallback);
  if (!Number.isFinite(limit) || limit <= 0) {
    return fallback;
  }
  return Math.min(Math.floor(limit), max);
}

function paginate(items, page = 1, limit = 10) {
  const totalPages = Math.max(1, Math.ceil(items.length / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * limit;

  return {
    items: items.slice(start, start + limit),
    pagination: {
      page: currentPage,
      limit,
      total: items.length,
      totalPages,
    },
  };
}

module.exports = {
  paginate,
  normalizeLimit,
  normalizePage,
  sanitizeUser,
};
