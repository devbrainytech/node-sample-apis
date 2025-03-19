import EmailLayout from './EmailLayout';
import EmailTemplate from './EmailTemplate';
import EmailTrigger from './EmailTrigger';

export const setupAssociations = () => {
  // Clear any existing associations
  EmailTemplate.removeAttribute('layout');
  EmailTrigger.removeAttribute('template');

  // Set up fresh associations with unique aliases
  EmailTemplate.belongsTo(EmailLayout, {
    foreignKey: 'layout_id',
    as: 'layoutDetails',
  });

  EmailTrigger.belongsTo(EmailTemplate, {
    foreignKey: 'template_id',
    as: 'templateDetails',
  });
};
