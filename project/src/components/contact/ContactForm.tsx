import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactFormProps {
  propertySuggestion?: string;
}

const ContactForm = ({ propertySuggestion }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: propertySuggestion 
      ? `Tenho interesse em saber mais sobre "${propertySuggestion}".`
      : '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formata a mensagem para o WhatsApp
    const whatsappMessage = `
*Novo Contato via Site*
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}
Mensagem: ${formData.message}
    `.trim();

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Número do WhatsApp
    const whatsappNumber = '5551991861221';
    
    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abre o WhatsApp em uma nova aba
    window.open(whatsappUrl, '_blank');
    
    // Limpa o formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          <label htmlFor="name" className="block text-sm font-medium text-primary/80 mb-1.5">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Seu nome completo"
            className="w-full p-3.5 border border-secondary-dark/20 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-secondary/20 text-primary"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <label htmlFor="email" className="block text-sm font-medium text-primary/80 mb-1.5">
            E-mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="seu.email@exemplo.com"
            className="w-full p-3.5 border border-secondary-dark/20 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-secondary/20 text-primary"
          />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative mb-6"
      >
        <label htmlFor="phone" className="block text-sm font-medium text-primary/80 mb-1.5">
          Telefone *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="(00) 00000-0000"
          className="w-full p-3.5 border border-secondary-dark/20 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-secondary/20 text-primary"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative mb-8"
      >
        <label htmlFor="message" className="block text-sm font-medium text-primary/80 mb-1.5">
          Mensagem *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Como posso ajudar você? Conte-me sobre suas necessidades imobiliárias..."
          className="w-full p-3.5 border border-secondary-dark/20 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-secondary/20 text-primary"
        ></textarea>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-dark text-white py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group font-display font-medium"
        >
          Enviar Mensagem
          <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </form>
  );
};

export default ContactForm;