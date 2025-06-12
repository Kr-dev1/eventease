import { IconBrandGithub, IconBrandLinkedinFilled } from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full text-center py-4 text-sm text-muted-foreground flex flex-col">
            © {new Date().getFullYear()} Kasturirangan. All rights reserved.
            <div className="flex items-center justify-center gap-4 mt-2">
                <Link href='https://www.linkedin.com/in/-kasturirangan/' target="_blank"><IconBrandLinkedinFilled /></Link>
                <Link href='https://github.com/Kr-dev1/' target="_blank"><IconBrandGithub /></Link>
            </div>
        </footer>
    );
};

export default Footer;
