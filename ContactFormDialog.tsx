import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  full_name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().max(2000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
}

const ContactFormDialog = ({ open, onOpenChange, planName }: ContactFormDialogProps) => {
  const { t, i18n } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { full_name: '', company: '', email: '', phone: '', message: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    const { error } = await supabase.from('contact_requests').insert({
      plan_name: planName,
      full_name: values.full_name,
      company: values.company || null,
      email: values.email,
      phone: values.phone || null,
      message: values.message || null,
      language: i18n.language.substring(0, 2),
    });
    setSubmitting(false);

    if (error) {
      toast({ title: t('cfd_error'), variant: 'destructive' });
      return;
    }
    setSubmitted(true);
  };

  const handleClose = (v: boolean) => {
    if (!v) {
      setSubmitted(false);
      form.reset();
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('cfd_title')}</DialogTitle>
          <DialogDescription>{t('cfd_subtitle', { plan: planName })}</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <CheckCircle2 className="h-12 w-12 text-[#27AE60]" />
            <p className="text-center font-medium text-foreground">{t('cfd_success')}</p>
            <p className="text-center text-sm text-muted-foreground">{t('cfd_success_detail')}</p>
            <Button variant="outline" className="mt-2" onClick={() => handleClose(false)}>
              {t('cfd_close')}
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="full_name" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('cfd_name')} *</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('cfd_company')}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('cfd_email')} *</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('cfd_phone')}</FormLabel>
                  <FormControl><Input type="tel" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('cfd_message')}</FormLabel>
                  <FormControl><Textarea rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <p className="text-xs text-muted-foreground">{t('cfd_privacy_note')}</p>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {t('cfd_submit')}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
