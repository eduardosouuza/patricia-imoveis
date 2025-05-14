/**
 * Constantes de animação para reutilização em componentes
 * Baseado na biblioteca Framer Motion
 */

// Animação de fade in para cima (aparece e sobe)
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Animação de fade in para baixo
export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Animação de fade in da esquerda
export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

// Animação de fade in da direita
export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

// Animação de zoom in
export const zoomIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// Configuração para animações que devem ser executadas apenas uma vez
export const viewportOnce = {
  once: true,
  margin: "0px 0px -100px 0px"
};

/**
 * Função para criar uma animação com atraso customizado
 * @param animation - Animação base
 * @param delay - Valor do atraso em segundos
 * @returns Animação com atraso personalizado
 */
export const withDelay = (animation: any, delay: number) => ({
  ...animation,
  transition: {
    ...animation.transition,
    delay
  }
}); 