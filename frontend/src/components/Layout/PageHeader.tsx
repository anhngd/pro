import React from 'react';
import { Box, Typography, Breadcrumbs, Link, Stack } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  breadcrumbs, 
  actions 
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 2 }}
        >
          {breadcrumbs.map((crumb, index) => (
            crumb.href ? (
              <Link
                key={index}
                href={crumb.href}
                color="text.secondary"
                underline="hover"
                sx={{ fontSize: '0.875rem', fontWeight: 500 }}
              >
                {crumb.label}
              </Link>
            ) : (
              <Typography
                key={index}
                color="text.primary"
                sx={{ fontSize: '0.875rem', fontWeight: 600 }}
              >
                {crumb.label}
              </Typography>
            )
          ))}
        </Breadcrumbs>
      )}

      {/* Header Content */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography variant="h3" fontWeight="bold" mb={subtitle ? 2 : 0} color="text.primary">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              {subtitle}
            </Typography>
          )}
          <Box 
            sx={{ 
              width: 60, 
              height: 4, 
              background: 'linear-gradient(90deg, #EB001B, #FF5F00)', 
              borderRadius: 2, 
              mt: 2 
            }} 
          />
        </Box>
        
        {actions && (
          <Box sx={{ ml: 3 }}>
            {actions}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PageHeader;
