"use client";
import {
    NavBody,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    Navbar,
} from "@/components/ui/resizable-navbar";

export function NavbarDemo() {
    return (
        <>
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavbarButton variant="primary" href="/register">Register</NavbarButton>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <NavbarButton variant="primary" href="/register">Register</NavbarButton>
                    </MobileNavHeader>
                </MobileNav>
            </Navbar>
        </>
    );
}