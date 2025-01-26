// src/styles/sectionStyles.ts

export interface SectionStyles {
    wrapper: React.CSSProperties;
    header: React.CSSProperties;
    title: React.CSSProperties;
    content: React.CSSProperties;
    backgroundSvg?: React.CSSProperties;
}

export const sectionStylesMap: { [templateId: string]: SectionStyles } = {
    modern: {
        wrapper: {
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '16px',
            position: 'relative',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e2e8f0',
            padding: '8px',
            marginBottom: '16px',
            backgroundColor: '#f7fafc',
        },
        title: {
            fontSize: '1rem',
            fontWeight: '600',
            color: '#1a202c',
        },
        content: {
            fontSize: '1rem',
            color: '#4a5568',
            padding: '0',
        },
        // Optionally add background SVG or other decorations
    },
    professional: {
        wrapper: {
            backgroundColor: '#f7fafc',
            borderRadius: '4px',
            padding: '20px',
            position: 'relative',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#edf2f7',
            padding: '10px',
            borderRadius: '4px 4px 0 0',
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#2d3748',
        },
        content: {
            fontSize: '1rem',
            color: '#2d3748',
            padding: '10px 0',
        },
        backgroundSvg: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            opacity: 0.1,
            // Example SVG background, you can use backgroundImage or SVG components
            backgroundImage: 'url(/path-to-svg.svg)',
            backgroundRepeat: 'no-repeat',
        },
    },
    // Add more templates as needed
    minimal: {
        wrapper: {
            padding: '12px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
        },
        title: {
            fontSize: '1rem',
            fontWeight: '500',
            color: '#4a5568',
        },
        content: {
            fontSize: '0.875rem',
            color: '#2d3748',
        },
    },
    bold: {
        wrapper: {
            backgroundColor: '#e2e8f0',
            padding: '24px',
            borderRadius: '0',
            position: 'relative',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #cbd5e0',
            paddingBottom: '12px',
            marginBottom: '20px',
        },
        title: {
            fontSize: '1.75rem',
            fontWeight: '800',
            color: '#2a4365',
        },
        content: {
            fontSize: '1.125rem',
            color: '#2a4365',
            padding: '8px 0',
        },
        backgroundSvg: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '150px',
            height: '150px',
            opacity: 0.05,
            backgroundImage: 'url(/path-to-another-svg.svg)',
            backgroundRepeat: 'no-repeat',
        },
    },
};
