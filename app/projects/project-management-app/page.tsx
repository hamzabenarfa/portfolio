import type { Metadata } from 'next';
import ProjectManagementPage from './client';

export const metadata: Metadata = {
    title: 'Project Management & Planning Application | Hamza Benarfa',
    description: 'A comprehensive project management tool for teams to organize tasks, manage projects, and visualize ideas with Kanban boards and charts.',
    openGraph: {
        title: 'Project Management & Planning Application | Hamza Benarfa',
        description: 'A comprehensive project management tool for teams to organize tasks, manage projects, and visualize ideas with Kanban boards and charts.',
        images: [
            {
                url: '/planner.png',
                width: 1200,
                height: 630,
                alt: 'Project Management & Planning Application',
            },
        ],
    },
};

export default function Page() {
    return <ProjectManagementPage />;
}
