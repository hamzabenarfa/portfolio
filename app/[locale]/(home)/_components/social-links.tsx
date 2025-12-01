import { SOCIAL_LINKS } from "@/data/consts";

export const SocialLink = ({ social }: { social: (typeof SOCIAL_LINKS)[0] }) => (
  <a
    href={social.url}
    target={social.download ? undefined : "_blank"}
    rel={social.download ? undefined : "noopener noreferrer"}
    download={social.download ? true : undefined}
    className="group p-4 border border-secondary/40 bg-secondary/10 rounded-lg hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:shadow-sm"
  >
    <div className="space-y-2">
      <div className="text-foreground group-hover:text-primary transition-colors duration-300">
        {social.name}
      </div>
      <div className="text-sm text-muted-foreground">{social.handle}</div>
    </div>
  </a>
);
