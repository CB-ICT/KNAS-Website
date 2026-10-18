import { useState } from 'react';
import { Alert, Button, ChoiceGroup, ErrorSummary, Select, TextArea, TextField } from '../components';
import { PageHeader, PageShell, Placeholder } from './PageShell';

/*
 * Formulierpagina: één kolom (sneller invullen, minder overslaan), max. ~40rem breed.
 * Valideren pas bij verzenden, dan foutensamenvatting bovenaan + fout bij elk veld.
 * "Toon fouten" demonstreert de foutstaat in de skeleton.
 */
export default function FormTemplate() {
  const [showErrors, setShowErrors] = useState(false);
  const errors = showErrors
    ? [
        { fieldId: 'f-naam', message: 'Vul je naam in' },
        { fieldId: 'f-email', message: 'Vul een e-mailadres in zoals naam@voorbeeld.nl' },
      ]
    : [];

  return (
    <PageShell currentPath="/contact">
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: '[Formuliernaam]' }]}
        title="[Formuliernaam]"
        intro={<p>[Wat gebeurt er na verzenden en hoe lang duurt het?]</p>}
      />
      <div className="k-container k-layout-aside k-layout-aside--end k-section k-section--flush-top">
        <div className="k-layout-aside__main">
          <form
            className="k-form"
            noValidate
            onSubmit={(event) => { event.preventDefault(); setShowErrors(true); }}
          >
            <ErrorSummary errors={errors} />
            <TextField id="f-naam" name="naam" label="Naam" autoComplete="name" error={showErrors ? 'Vul je naam in' : undefined} />
            <TextField
              id="f-email"
              name="email"
              type="email"
              label="E-mailadres"
              hint="We gebruiken dit alleen om je vraag te beantwoorden."
              autoComplete="email"
              error={showErrors ? 'Vul een e-mailadres in zoals naam@voorbeeld.nl' : undefined}
            />
            <TextField name="postcode" label="Postcode" width="sm" autoComplete="postal-code" optional />
            <Select
              name="onderwerp"
              label="Onderwerp"
              options={[
                { value: 'lidmaatschap', label: 'Lidmaatschap' },
                { value: 'wedstrijden', label: 'Wedstrijden' },
                { value: 'anders', label: 'Iets anders' },
              ]}
            />
            <ChoiceGroup
              name="rol"
              type="radio"
              label="Ik ben"
              options={[
                { value: 'schermer', label: 'Schermer of ouder' },
                { value: 'club', label: 'Bestuurder of trainer', hint: 'Je krijgt antwoord van de verenigingsondersteuning.' },
                { value: 'pers', label: 'Pers of sponsor' },
              ]}
            />
            <TextArea name="bericht" label="Je vraag" />
            <ChoiceGroup name="akkoord" type="checkbox" label="Toestemming" options={[{ value: 'ja', label: 'Ik ga akkoord met de privacyverklaring' }]} />
            <div className="k-form__actions">
              <Button type="submit" variant="primary">Verstuur</Button>
              <Button variant="text" href="/">Annuleren</Button>
            </div>
          </form>
        </div>
        <aside className="k-layout-aside__aside" aria-label="Hulp bij dit formulier">
          <Alert tone="info" title="Liever bellen?">[Telefoonnummer en bereikbaarheid]</Alert>
          <Placeholder label="Veelgestelde vragen over dit onderwerp" height="8rem" />
        </aside>
      </div>
    </PageShell>
  );
}
