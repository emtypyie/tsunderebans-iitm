import scData from '../scData_generated.js';

/**
 * Resources live with their subject, keyed by official course code.
 *
 * Today only Data Science subjects carry notes / lectures / PYQs — they are
 * keyed out of `scData_generated.js` below. To add resources for Electronic
 * Systems, Aeronautics or Management, drop an entry into RESOURCES_BY_CODE
 * (either here or from a generated sheet):
 *
 *   RESOURCES_BY_CODE.EE2101 = {
 *     lectures: [{ title: '…', link: '…', badge: 'Popular' }],
 *     notes: [{ title: '… (by …)', link: '…' }],
 *     pyq: [{ title: '…', link: '…' }],
 *   };
 *
 * The ResourceBrowser reads only `resourcesFor(code)`, so a subject with no
 * entry simply renders the "no resources yet" state and nothing else changes.
 */

const EMPTY_RESOURCES = { lectures: [], notes: [], pyq: [] };

const RESOURCES_BY_CODE = {};

Object.keys(scData).forEach((level) => {
  (scData[level] || []).forEach((subject) => {
    RESOURCES_BY_CODE[subject.code] = subject.resources || EMPTY_RESOURCES;
  });
});

/** Where a subject with no resources can be asked for. */
export const REQUEST_RESOURCE_URL = 'https://forms.gle/KNm4hyupaG22Huxd6';

/** Curated Drive folders that sit alongside the per-item links. */
export const driveLinks = {
  foundationPyq: 'https://drive.google.com/drive/folders/1Fq3vpXmmN3moEFa9TdBqkBfkMfjaPyh-',
  diplomaPyq: 'https://drive.google.com/drive/folders/1FnI9uXbnSGqMBRLWyWPD5839R9xXjS5I',
  notes: {
    BSMA1001: 'https://drive.google.com/drive/folders/1SuT80Mt_1mhgeDb8_PF5nE2f626wI-5C',
    BSMA1002: 'https://drive.google.com/drive/folders/1TVvNKumzi1tD5rRPR4B_SHfR6KyHXgkv',
    BSHS1001: 'https://drive.google.com/drive/folders/1TJ_i7aNmcKBk_DAA7EmzCKTJ5fEBYWOD',
    BSCS1001: 'https://drive.google.com/drive/folders/15BrCrZ0cBxcOOhDFwavZX9WJnwXu149O',
    BSMA1003: 'https://drive.google.com/drive/folders/1T0Vk5wWuGlhKhCv1qGYnS7T5_mmceeFy',
    BSMA1004: 'https://drive.google.com/drive/folders/1TNS9WHBWUKInU2Jey23DRwzNySeRjB3O',
    BSHS1002: 'https://drive.google.com/drive/folders/1z68X9eGokOfrzlaCKV3v16bSpgInneKd',
    BSCS1002: 'https://drive.google.com/drive/folders/1O7w1hXO6d0uptWs1U4BCMGVEdfSDxNWo',
    BSCS2001: 'https://drive.google.com/drive/folders/1PtqrInqJV0ZcZbis2hFndmOM08lMmoS_',
    BSCS2005: 'https://drive.google.com/drive/folders/1Q-FPcyrurSml35qHizU6An3_c7f8_xie',
    BSCS2003: 'https://drive.google.com/drive/folders/1MbGGvTyRM0-27le2He5TKdhw8HSPfC0j',
    BSCS2006: 'https://drive.google.com/drive/folders/1Pl7g4i6e9HRR5ZQLYaJlbj6BQ-16ZtDK',
    BSCS2002: 'https://drive.google.com/drive/folders/1Pn7Zaa8tfXbXIBbiX9WYg_WcfIVMHCdG',
    BSSE2001: 'https://drive.google.com/drive/folders/1PsMUC0fAMCNVB5HVgZ_TZQC3CWhT5K3g',
    BSMS2002: 'https://drive.google.com/drive/folders/1UTximp3FWwJV6_5nBmJlISPIbzvMu8s0',
    BSMS2001: 'https://drive.google.com/drive/folders/1UIjX4MUeJBQnSJqRnO5XI8SFm50XDPml',
    BSCS2004: 'https://drive.google.com/drive/folders/1ODZY3E2PcsaFrzIHPo5lUhQZaBszZxxS',
    BSCS2008: 'https://drive.google.com/drive/folders/1UIVGGZYEldx98djyOI6aR18ec-07Qies',
    BSCS2007: 'https://drive.google.com/drive/folders/1UFpj7Lauj4l_YvA8U6tR0dqubv4K0gwy',
    BSSE2002: 'https://drive.google.com/drive/folders/1UK3pOkccniwBm1-YfpQgjrEfXFMrOtVy',
  },
};

/** The resource array for a subject, always one of the three type shapes. */
export function resourcesFor(code) {
  return RESOURCES_BY_CODE[code] || EMPTY_RESOURCES;
}

/** Does a subject carry any indexed resources at all? */
export function hasResources(code) {
  const r = RESOURCES_BY_CODE[code];
  return Boolean(r && (r.lectures?.length || r.notes?.length || r.pyq?.length));
}
