---
layout: home
title: Путеводитель по каналу
description: DIY - озвучка на диване, преимущественно работ, связанных с анархизмом

# Build settings
theme: minima
---
<base target="_blank">

{% include filter-controls.html %}

{% assign sections = site.data.sections.sections %}
{% assign all = site.data.recordings.recordings %}


{% for section in sections %}
<div class="recordings-section" id="{{ section.id }}-section" markdown="1">

## {{ section.title }} {#{{ section.id }}}

{% if section.subsections %}
{% assign section_entries = all | where: "type", section.type %}
{% for sub in section.subsections %}
<div class="recordings-section" id="{{ sub.id }}-section" markdown="1">

### {{ sub.title }} {#{{ sub.id }}}

{% assign sub_entries = section_entries | where: "source", sub.source %}
<ul class="recordings-list">
{% for entry in sub_entries %}
  {% include recording-item.html entry=entry %}
{% endfor %}
</ul>

</div>
{% endfor %}

{% elsif section.status %}
{% assign entries = all | where: "type", section.type | where: "status", section.status %}
<ul class="recordings-list">
{% for entry in entries %}
  {% include recording-item.html entry=entry %}
{% endfor %}
</ul>

{% else %}
{% assign entries = all | where: "type", section.type %}
<ul class="recordings-list">
{% for entry in entries %}
  {% include recording-item.html entry=entry %}
{% endfor %}
</ul>

{% endif %}
</div>
{% endfor %}
