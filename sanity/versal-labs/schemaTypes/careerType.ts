import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export const careerType = defineType({
  name: 'career',
  title: 'Job Opening',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Engineering', value: 'engineering'},
          {title: 'Product', value: 'product'},
          {title: 'Design', value: 'design'},
          {title: 'Sales', value: 'sales'},
          {title: 'Marketing', value: 'marketing'},
          {title: 'Operations', value: 'operations'},
          {title: 'HR & People', value: 'hr'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Colombo, Sri Lanka or Remote',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Part-time', value: 'part-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'Internship', value: 'internship'},
          {title: 'Freelance', value: 'freelance'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'experienceLevel',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          {title: 'Junior', value: 'junior'},
          {title: 'Mid-level', value: 'mid'},
          {title: 'Senior', value: 'senior'},
          {title: 'Lead', value: 'lead'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'remoteOption',
      title: 'Work Arrangement',
      type: 'string',
      options: {
        list: [
          {title: 'On-site', value: 'onsite'},
          {title: 'Hybrid', value: 'hybrid'},
          {title: 'Remote', value: 'remote'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300).warning('Keep the summary concise'),
    }),
    defineField({
      name: 'description',
      title: 'Role Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'perks',
      title: 'Benefits & Perks',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'salaryRange',
      title: 'Salary Range',
      type: 'object',
      fields: [
        defineField({
          name: 'min',
          title: 'Minimum',
          type: 'number',
        }),
        defineField({
          name: 'max',
          title: 'Maximum',
          type: 'number',
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'LKR',
        }),
        defineField({
          name: 'period',
          title: 'Period',
          type: 'string',
          options: {
            list: [
              {title: 'Per Month', value: 'month'},
              {title: 'Per Year', value: 'year'},
            ],
            layout: 'radio',
          },
        }),
      ],
    }),
    defineField({
      name: 'applicationUrl',
      title: 'Application URL',
      type: 'url',
      description: 'Link to an external application form, if any.',
    }),
    defineField({
      name: 'applicationEmail',
      title: 'Application Email',
      type: 'string',
      validation: (rule) => rule.email().warning('Should be a valid email address'),
    }),
    defineField({
      name: 'closingDate',
      title: 'Application Closing Date',
      type: 'date',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Inactive roles will be hidden from the careers page.',
    }),
    defineField({
      name: 'postedAt',
      title: 'Posted At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'department',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle: subtitle ? `Department: ${subtitle}` : undefined,
      }
    },
  },
})
