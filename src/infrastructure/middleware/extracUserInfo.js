const extractUserInfo = (req, res, next) => {
  console.log('🔍 EXTRACT USER INFO - Headers recibidos:', {
    'x-user-id': req.headers['x-user-id'],
    'x-user-email': req.headers['x-user-email'],
    'x-user-role': req.headers['x-user-role'],
    'x-request-id': req.headers['x-request-id'],
    'content-type': req.headers['content-type'],
    'content-length': req.headers['content-length']
  });

  // Extraer información del usuario desde headers del API Gateway
  req.user = {
    id: req.headers['x-user-id'],
    email: req.headers['x-user-email'],
    role: req.headers['x-user-role'] || req.headers['x-user-profile'] // Fallback
  };
  
  // ID de request para tracking
  req.requestId = req.headers['x-request-id'];
  
  console.log('👤 Usuario extraído:', {
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
    requestId: req.requestId
  });

  // Verificar que tenemos la información mínima necesaria
  if (!req.user.id || !req.user.role) {
    console.warn('⚠️ Headers de usuario incompletos:', {
      hasUserId: !!req.user.id,
      hasUserRole: !!req.user.role,
      headers: req.headers
    });
  }
  
  next();
};

module.exports = extractUserInfo;