/**
 * Shared Section component — was duplicated in projects-section.tsx and connect.tsx.
 */

export const Section = ({
    id,
    children,
    className = "",
    ...props
}: React.HTMLAttributes<HTMLElement> & { id: string }) => (
    <section id={id} className={`min-h-screen py-10 ${className}`} {...props}>
        {children}
    </section>
);
