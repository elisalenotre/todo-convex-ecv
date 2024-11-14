import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SignIn } from './SignIn';
import { useAuthActions } from '@convex-dev/auth/react';

vi.mock('@convex-dev/auth/react', () => ({
    useAuthActions: () => ({
        signIn: vi.fn(),
    }),
}));

describe('SignIn', () => {
    it('renders the sign-in form', () => {
        render(<SignIn onSignIn={() => {}} />);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByText('Send sign-in link')).toBeInTheDocument();
    });

    it('calls signIn and onSignIn when form is submitted', () => {
        const mockSignIn = vi.fn();
        const mockOnSignIn = vi.fn();
        vi.mocked(useAuthActions).mockReturnValue({
            signIn: mockSignIn,
            signOut: function (this: void): Promise<void> {
                throw new Error('Function not implemented.');
            }
        });

        render(<SignIn onSignIn={mockOnSignIn} />);

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.submit(screen.getByRole('button'));

        expect(mockSignIn).toHaveBeenCalledWith('resend', expect.any(FormData));
        expect(mockOnSignIn).toHaveBeenCalled();
    });
});