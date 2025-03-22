import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

interface HeaderProps {
  onToggleSidebar: () => void;
  onAddTask?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onAddTask }) => {
  const { t, i18n } = useTranslation();
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(null);
  
  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };
  
  const handleLanguageMenuClose = () => {
    setLangMenuAnchor(null);
  };
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    handleLanguageMenuClose();
  };
  
  return (
    <AppBar position="fixed" className={styles.header}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
          className={styles.menuButton}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" className={styles.title}>
          {t('app.title')}
        </Typography>
        
        <Box className={styles.actions}>
          {onAddTask && (
            <Button
              color="inherit"
              startIcon={<AddIcon />}
              onClick={onAddTask}
              className={styles.addButton}
            >
              {t('tasks.add')}
            </Button>
          )}
          
          <IconButton
            color="inherit"
            aria-label="change language"
            onClick={handleLanguageMenuOpen}
          >
            <TranslateIcon />
          </IconButton>
          
          <Menu
            anchorEl={langMenuAnchor}
            open={Boolean(langMenuAnchor)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={() => changeLanguage('ru')}>Русский</MenuItem>
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 