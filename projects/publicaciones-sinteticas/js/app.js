// Demo solo frontend: NO usa API ni backend

const postForm = document.getElementById('postForm');
const generatedPost = document.getElementById('generatedPost');
const loader = document.getElementById('loader');
const copyButton = document.getElementById('copyButton');

postForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const topic = document.getElementById('topic').value.trim();
  const tone = document.getElementById('tone').value;
  const length = document.getElementById('length').value;
  const platform = document.getElementById('platform').value;
  const hashtags = document.getElementById('hashtags').value.trim();

  if (!topic) return;

  loader.classList.remove('hidden');
  generatedPost.classList.add('empty');
  generatedPost.textContent = '';
  copyButton.disabled = true;

  // Simulación de generación "tipo IA"
  setTimeout(() => {
    const introMap = {
      informal: `Te comparto algo sobre ${topic.toLowerCase()}:`,
      profesional: `Compartimos una breve publicación sobre ${topic.toLowerCase()}:`,
      motivado: `Hoy es un buen día para hablar de ${topic.toLowerCase()}:`,
      educativo: `Aprendamos un poco más sobre ${topic.toLowerCase()}:`,
    };

    const platformHint = {
      generico: '',
      instagram: '\n\n✨ Ideal para publicar en Instagram como carrusel o reel.',
      twitter: '\n\n🧵 Puedes adaptarlo como hilo corto en X/Twitter.',
      facebook: '\n\n📣 Perfecto para una publicación con imagen en Facebook.',
      linkedin: '\n\n💼 Enfócalo como contenido de valor en LinkedIn.',
    };

    let body = '';
    if (length === 'corto') {
      body = `Un mensaje claro, directo y fácil de entender para que más personas se interesen en este tema.`;
    } else if (length === 'medio') {
      body =
        `Un texto equilibrado que combina información útil con un tono cercano. La idea es motivar a quien lo lea a dar el siguiente paso, ya sea comenzar, mejorar o profundizar en el tema.`;
    } else {
      body =
        `Primero, presentamos la idea principal de forma simple. Luego, añadimos uno o dos consejos prácticos que la gente pueda aplicar de inmediato. Por último, cerramos con una invitación a reflexionar o a tomar acción, manteniendo siempre un tono amigable y directo.`;
    }

    const closing =
      tone === 'motivado'
        ? 'Recuerda: lo importante es dar el primer paso y mantener la constancia.'
        : tone === 'profesional'
        ? 'Comparte este contenido con quienes puedan beneficiarse de esta información.'
        : 'Si te sirve, compártelo con alguien más a quien también pueda ayudar.';

    const intro = introMap[tone] || introMap.informal;

    let finalText = `${intro}\n\n${body}\n\n${closing}${platformHint[platform] || ''}`;

    if (hashtags) {
      finalText += `\n\n${hashtags}`;
    }

    loader.classList.add('hidden');
    generatedPost.classList.remove('empty');
    generatedPost.textContent = finalText;
    copyButton.disabled = false;
  }, 700);
});

// Botón para copiar
copyButton.addEventListener('click', () => {
  const text = generatedPost.textContent;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    copyButton.textContent = '¡Copiado!';
    setTimeout(() => {
      copyButton.textContent = 'Copiar texto';
    }, 1500);
  });
});
