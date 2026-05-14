import { CheckCircle2, Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage, LocalizedLink } from "@/i18n";
import { getLocation } from "@/data/locations";

interface Props {
  reference?: string;
}

export default function BookingSuccess({ reference }: Props) {
  const { t } = useLanguage();
  const muenchen = getLocation("muenchen");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-8 sm:p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-12 h-12 text-primary" />
      </motion.div>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
        {t("booking.successTitle")}
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-2">
        {t("booking.successDescription")}
      </p>

      {reference && (
        <p className="text-xs text-muted-foreground mb-6">
          {t("booking.successRef")}{" "}
          <span className="font-mono font-semibold text-foreground">
            {reference}
          </span>
        </p>
      )}

      <div className="mt-6 mb-8 grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
        <p className="text-xs text-muted-foreground sm:col-span-2">
          {t("booking.successUrgent")}
        </p>
        {muenchen && (
          <a href={`tel:${muenchen.phone}`}>
            <Button variant="outline" className="w-full rounded-full gap-2">
              <Phone className="w-4 h-4" />
              {muenchen.phoneDisplay}
            </Button>
          </a>
        )}
        {muenchen && (
          <a href={`mailto:${muenchen.email}`}>
            <Button variant="outline" className="w-full rounded-full gap-2">
              <Mail className="w-4 h-4" />
              {t("booking.email")}
            </Button>
          </a>
        )}
      </div>

      <LocalizedLink to="home">
        <Button variant="ghost" className="rounded-full gap-2">
          {t("booking.backHome")} <ArrowRight className="w-4 h-4" />
        </Button>
      </LocalizedLink>
    </motion.div>
  );
}
