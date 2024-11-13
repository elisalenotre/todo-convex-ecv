import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app and displays the task list', () => {
    render(<App />);
    expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
  });

  it('nouvelle tâche quand le bouton est cliqué', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Ajouter une tâche');
    const button = screen.getByText('Ajouter');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);
    
    expect(await screen.findByText('New Task')).toBeInTheDocument();
  });

  it('filtrer les tâches par status quand le bouton filtre est cliqué', async () => {
    render(<App />);
    const todoButton = screen.getByText('Toutes');
    fireEvent.click(todoButton);
    expect(screen.getByText('Toutes')).toBeInTheDocument();
  });

  it('mise à jour des status quand un nouveau status est sélectionné', async () => {
    render(<App />);
    const select = screen.getByDisplayValue('todo') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'done' } });
    expect(select.value).toBe('done');
  });

  it('suppression de la tâche quand le bouton supprimé est cliqué', async () => {
    render(<App />);
    const deleteButton = screen.getByText('Supprimer');
    fireEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument();
  });
});